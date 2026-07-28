import path from 'path';

export default {
  process(sourcePath) {
    const filename = path.basename(sourcePath);
    return `export default '${filename}';`;
  },
  getCacheKey() {
    return 'file-cache';
  }
};