const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");let o=null;function r(){t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.addEventListener("click",(function(){o=setInterval((()=>{r()}),1e3),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(o),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.884733ef.js.map
