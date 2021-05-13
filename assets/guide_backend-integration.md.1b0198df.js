import{o as n,c as s,d as a}from"./app.5ce87161.js";const t='{"title":"Backend Integration","description":"","frontmatter":{},"relativePath":"guide/backend-integration.md","lastUpdated":1620885483821}',p={},o=a('<h1 id="backend-integration"><a class="header-anchor" href="#backend-integration" aria-hidden="true">#</a> Backend Integration</h1><p>If you want to serve the HTML using a traditional backend (e.g. Rails, Laravel) but use Vite for serving assets, check for existing integrations listed in <a href="https://github.com/vitejs/awesome-vite#integrations-with-backends" target="_blank" rel="noopener noreferrer">Awesome Vite</a>.</p><p>Or you can follow these steps to configure it manually:</p><ol><li><p>In your Vite config, configure the entry and enable build manifest:</p><div class="language-js"><pre><code><span class="token comment">// vite.config.js</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  build<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// generate manifest.json in outDir</span>\n    manifest<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token comment">// overwrite default .html entry</span>\n      input<span class="token operator">:</span> <span class="token string">&#39;/path/to/main.js&#39;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>Also remember to add the <a href="/config/#build-polyfilldynamicimport">dynamic import polyfill</a> to your entry, since it will no longer be auto-injected:</p><div class="language-js"><pre><code><span class="token comment">// add the beginning of your app entry</span>\n<span class="token keyword">import</span> <span class="token string">&#39;vite/dynamic-import-polyfill&#39;</span>\n</code></pre></div></li><li><p>For development, inject the following in your server&#39;s HTML template (substitute <code>http://localhost:3000</code> with the local URL Vite is running at):</p><div class="language-html"><pre><code><span class="token comment">&lt;!-- if development --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://localhost:3000/@vite/client<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://localhost:3000/main.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>Also make sure the server is configured to serve static assets in the Vite working directory, otherwise assets such as images won&#39;t be loaded properly.</p><p>Note if you are using React with <code>@vitejs/plugin-react-refresh</code>, you&#39;ll also need to add this before the above scripts, since the plugin is not able to modify the HTML you are serving:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">import</span> RefreshRuntime <span class="token keyword">from</span> <span class="token string">&quot;http://localhost:3000/@react-refresh&quot;</span>\n  RefreshRuntime<span class="token punctuation">.</span><span class="token function">injectIntoGlobalHook</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span> \n  window<span class="token punctuation">.</span><span class="token function-variable function">$RefreshReg$</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  window<span class="token punctuation">.</span><span class="token function-variable function">$RefreshSig$</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> type\n  window<span class="token punctuation">.</span>__vite_plugin_react_preamble_installed__ <span class="token operator">=</span> <span class="token boolean">true</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div></li><li><p>For production: after running <code>vite build</code>, a <code>manifest.json</code> file will be generated alongside other asset files. An example manifest file looks like this:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;main.js&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/main.4889e940.js&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;src&quot;</span><span class="token operator">:</span> <span class="token string">&quot;main.js&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;isEntry&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dynamicImports&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;views/foo.js&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;css&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;assets/main.b82dbe22.css&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;assets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;assets/asset.0ab0f9cd.png&quot;</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;views/foo.js&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/foo.869aea0d.js&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;src&quot;</span><span class="token operator">:</span> <span class="token string">&quot;views/foo.js&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;isDynamicEntry&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;imports&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;_shared.83069a53.js&quot;</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;_shared.83069a53.js&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token string">&quot;assets/shared.83069a53.js&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><ul><li>The manifest has a <code>Record&lt;name, chunk&gt;</code> structure</li><li>For entry or dynamic entry chunks, the key is the relative src path from project root.</li><li>For non entry chunks, the key is the base name of the generated file prefixed with <code>_</code>.</li><li>Chunks will contain information on its static and dynamic imports (both are keys that maps to the corresponding chunk in the manifest), and also its corresponding CSS and asset files (if any).</li></ul><p>You can use this file to render links or preload directives with hashed filenames (note: the syntax here is for explanation only, substitute with your server templating language):</p><div class="language-html"><pre><code><span class="token comment">&lt;!-- if production --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/assets/{{ manifest[<span class="token punctuation">&#39;</span>main.js<span class="token punctuation">&#39;</span>].css }}<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/assets/{{ manifest[<span class="token punctuation">&#39;</span>main.js<span class="token punctuation">&#39;</span>].file }}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div></li></ol>',4);p.render=function(a,t,p,e,c,l){return n(),s("div",null,[o])};export default p;export{t as __pageData};
