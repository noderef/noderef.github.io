import { useEffect, useState } from 'react';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  content_type: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

interface ReleaseAssets {
  windows?: string;
  mac?: string;
  macAppleSilicon?: string;
  linux?: string;
}

export function useGitHubRelease() {
  const [assets, setAssets] = useState<ReleaseAssets>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://api.github.com/repos/noderef/noderef/releases/latest',
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch release: ${response.statusText}`);
        }

        const release: GitHubRelease = await response.json();
        setVersion(release.tag_name);

        const releaseAssets: ReleaseAssets = {};

        // Match assets based on file extensions and names
        for (const asset of release.assets) {
          const name = asset.name.toLowerCase();

          // Windows MSI
          if (name.endsWith('.msi')) {
            releaseAssets.windows = asset.browser_download_url;
          }
          // Mac DMG
          else if (name.endsWith('.dmg')) {
            // Check for Apple Silicon specific naming (arm64, m1, m2, m3, apple-silicon)
            if (
              name.includes('arm64') ||
              name.includes('m1') ||
              name.includes('m2') ||
              name.includes('m3') ||
              name.includes('apple-silicon') ||
              name.includes('silicon')
            ) {
              releaseAssets.macAppleSilicon = asset.browser_download_url;
            }
            // Check for Intel Mac specific naming (x64, intel, x86_64)
            else if (
              name.includes('x64') ||
              name.includes('intel') ||
              name.includes('x86_64') ||
              name.includes('universal')
            ) {
              // Universal binaries can work on both, but prefer for Intel if no specific Intel build
              if (!releaseAssets.mac || name.includes('universal')) {
                releaseAssets.mac = asset.browser_download_url;
              }
            } else {
              // Default to Intel Mac if no specific architecture indicator
              if (!releaseAssets.mac) {
                releaseAssets.mac = asset.browser_download_url;
              }
            }
          }
          // Linux DEB (Debian naming: noderef_<version>_<arch>.deb)
          else if (name.endsWith('.deb') && name.startsWith('noderef')) {
            releaseAssets.linux = asset.browser_download_url;
          }
        }

        setAssets(releaseAssets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch release');
        console.error('Error fetching GitHub release:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, []);

  return { assets, loading, error, version };
}
