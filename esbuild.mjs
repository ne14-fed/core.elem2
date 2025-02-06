import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { readFile as fs_readFile } from 'fs/promises';
import { compileStringAsync } from 'sass';
import CleanCSS from 'clean-css';
import { minify as hmt_minify } from 'html-minifier-terser';

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

const options = {
  entryPoints: ['src/main.ts'],
  loader: { '.html': 'text', '.css': 'text' },
  plugins: [
    sassPlugin({
      type: 'css-text',
      async transform(source) {
        const result = await compileStringAsync(source);
        return new CleanCSS({}).minify(result.css).styles;
      }
    }),
    {
      name: 'html-minifier-plugin',
      setup(build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
          const source = await fs_readFile(args.path, 'utf8');
          const minified = await hmt_minify(source, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true, 
          });
          return { contents: minified, loader: 'text' };
        });
      },
    },
  ],
  outfile: 'dist/index.js',
  format: 'esm',
  bundle: true,
  minify: true,
};

if (isWatchMode) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}

