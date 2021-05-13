import{o as n,c as e,d as s}from"./app.5ce87161.js";const a='{"title":"Migration from v1","description":"","frontmatter":{},"headers":[{"level":2,"title":"Config Options Change","slug":"config-options-change"},{"level":2,"title":"Alias Behavior Change","slug":"alias-behavior-change"},{"level":2,"title":"Vue Support","slug":"vue-support"},{"level":3,"title":"Custom Blocks Transforms","slug":"custom-blocks-transforms"},{"level":2,"title":"React Support","slug":"react-support"},{"level":2,"title":"HMR API Change","slug":"hmr-api-change"},{"level":2,"title":"Manifest Format Change","slug":"manifest-format-change"},{"level":2,"title":"For Plugin Authors","slug":"for-plugin-authors"}],"relativePath":"guide/migration.md","lastUpdated":1620885483821}',o={},t=s('<h1 id="migration-from-v1"><a class="header-anchor" href="#migration-from-v1" aria-hidden="true">#</a> Migration from v1</h1><h2 id="config-options-change"><a class="header-anchor" href="#config-options-change" aria-hidden="true">#</a> Config Options Change</h2><ul><li><p>The following options have been removed and should be implemented via <a href="./api-plugin.html">plugins</a>:</p><ul><li><code>resolvers</code></li><li><code>transforms</code></li><li><code>indexHtmlTransforms</code></li></ul></li><li><p><code>jsx</code> and <code>enableEsbuild</code> have been removed; Use the new <a href="/config/#esbuild"><code>esbuild</code></a> option instead.</p></li><li><p><a href="/config/#css-modules">CSS related options</a> are now nested under <code>css</code>.</p></li><li><p>All <a href="/config/#build-options">build-specific options</a> are now nested under <code>build</code>.</p><ul><li><code>rollupInputOptions</code> and <code>rollupOutputOptions</code> are replaced by <a href="/config/#build-rollupoptions"><code>build.rollupOptions</code></a>.</li><li><code>esbuildTarget</code> is now <a href="/config/#build-target"><code>build.target</code></a>.</li><li><code>emitManifest</code> is now <a href="/config/#build-manifest"><code>build.manifest</code></a>.</li><li>The following build options have been removed since they can be achieved via plugin hooks or other options: <ul><li><code>entry</code></li><li><code>rollupDedupe</code></li><li><code>emitAssets</code></li><li><code>emitIndex</code></li><li><code>shouldPreload</code></li><li><code>configureBuild</code></li></ul></li></ul></li><li><p>All <a href="/config/#server-options">server-specific options</a> are now nested under <code>server</code>.</p><ul><li><code>hostname</code> is now <a href="/config/#server-host"><code>server.host</code></a>.</li><li><code>httpsOptions</code> has been removed. <a href="/config/#server-https"><code>server.https</code></a> can directly accept the options object.</li><li><code>chokidarWatchOptions</code> is now <a href="/config/#server-watch"><code>server.watch</code></a>.</li></ul></li><li><p><a href="/config/#assetsInclude"><code>assetsInclude</code></a> now expects <code>string | RegExp | (string | RegExp)[]</code> instead of a function.</p></li><li><p>All Vue specific options are removed; Pass options to the Vue plugin instead.</p></li></ul><h2 id="alias-behavior-change"><a class="header-anchor" href="#alias-behavior-change" aria-hidden="true">#</a> Alias Behavior Change</h2><p><a href="/config/#alias"><code>alias</code></a> is now being passed to <code>@rollup/plugin-alias</code> and no longer require start/ending slashes. The behavior is now a direct replacement, so 1.0-style directory alias key should remove the ending slash:</p><div class="language-diff"><pre><code><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> alias: { &#39;/@foo/&#39;: path.resolve(__dirname, &#39;some-special-dir&#39;) }\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> alias: { &#39;/@foo&#39;: path.resolve(__dirname, &#39;some-special-dir&#39;) }\n</span></span></code></pre></div><p>Alternatively, you can use the <code>[{ find: RegExp, replacement: string }]</code> option format for more precise control.</p><h2 id="vue-support"><a class="header-anchor" href="#vue-support" aria-hidden="true">#</a> Vue Support</h2><p>Vite 2.0 core is now framework agnostic. Vue support is now provided via <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue" target="_blank" rel="noopener noreferrer"><code>@vitejs/plugin-vue</code></a>. Simply install it and add it in the Vite config:</p><div class="language-js"><pre><code><span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="custom-blocks-transforms"><a class="header-anchor" href="#custom-blocks-transforms" aria-hidden="true">#</a> Custom Blocks Transforms</h3><p>A custom plugin can be used to transform Vue custom blocks like the one below:</p><div class="language-ts"><pre><code><span class="token comment">// vite.config.js</span>\n<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>\n\n<span class="token keyword">const</span> vueI18nPlugin <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;vue-i18n&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">transform</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">vue&amp;type=i18n</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.ya?ml$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      code <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;js-yaml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">safeLoad</span><span class="token punctuation">(</span>code<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">export default Comp =&gt; {\n      Comp.i18n = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n    }</span><span class="token template-punctuation string">`</span></span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> vueI18nPlugin<span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="react-support"><a class="header-anchor" href="#react-support" aria-hidden="true">#</a> React Support</h2><p>React Fast Refresh support is now provided via <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-react-refresh" target="_blank" rel="noopener noreferrer"><code>@vitejs/plugin-react-refresh</code></a>.</p><h2 id="hmr-api-change"><a class="header-anchor" href="#hmr-api-change" aria-hidden="true">#</a> HMR API Change</h2><p><code>import.<wbr>meta.hot.acceptDeps()</code> have been deprecated. <a href="./api-hmr.html#hot-accept-deps-cb"><code>import.<wbr>meta.hot.accept()</code></a> can now accept single or multiple deps.</p><h2 id="manifest-format-change"><a class="header-anchor" href="#manifest-format-change" aria-hidden="true">#</a> Manifest Format Change</h2><p>The build manifest now uses the following format:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;index.js&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/index.acaf2b48.js&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;imports&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;index.css&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/index.7b7dbd85.css&quot;</span>\n  <span class="token punctuation">}</span>\n  <span class="token property">&quot;asset.png&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/asset.0ab0f9cd.png&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>For entry JS chunks, it also lists its imported chunks which can be used to render preload directives.</p><h2 id="for-plugin-authors"><a class="header-anchor" href="#for-plugin-authors" aria-hidden="true">#</a> For Plugin Authors</h2><p>Vite 2 uses a completely redesigned plugin interface which extends Rollup plugins. Please read the new <a href="./api-plugin.html">Plugin Development Guide</a>.</p><p>Some general pointers on migrating a v1 plugin to v2:</p><ul><li><code>resolvers</code> -&gt; use the <a href="https://rollupjs.org/guide/en/#resolveid" target="_blank" rel="noopener noreferrer"><code>resolveId</code></a> hook</li><li><code>transforms</code> -&gt; use the <a href="https://rollupjs.org/guide/en/#transform" target="_blank" rel="noopener noreferrer"><code>transform</code></a> hook</li><li><code>indexHtmlTransforms</code> -&gt; use the <a href="./api-plugin.html#transformindexhtml"><code>transformIndexHtml</code></a> hook</li><li>Serving virtual files -&gt; use <a href="https://rollupjs.org/guide/en/#resolveid" target="_blank" rel="noopener noreferrer"><code>resolveId</code></a> + <a href="https://rollupjs.org/guide/en/#load" target="_blank" rel="noopener noreferrer"><code>load</code></a> hooks</li><li>Adding <code>alias</code>, <code>define</code> or other config options -&gt; use the <a href="./api-plugin.html#config"><code>config</code></a> hook</li></ul><p>Since most of the logic should be done via plugin hooks instead of middlewares, the need for middlewares is greatly reduced. The internal server app is now a good old <a href="https://github.com/senchalabs/connect" target="_blank" rel="noopener noreferrer">connect</a> instance instead of Koa.</p>',26);o.render=function(s,a,o,p,i,c){return n(),e("div",null,[t])};export default o;export{a as __pageData};
