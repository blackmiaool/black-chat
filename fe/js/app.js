let requirejsConfig={
    baseUrl: '/dist/js',
    paths: {
        app: '../app'
    }
};

let pages=["chat","login","logout"];
pages.forEach(function(v,i){
    requirejsConfig.paths[v]=v+"/"+v;
})
define("entry",["common"],function(common){   
    let page=common.args.page;
    if(pages.indexOf(page)=== -1){
        window.location.href=location.origin+"/chat";
    }else{
        let link=$(`<link rel="stylesheet">`);
        link.attr("href",`/dist/css/${page}.css`);
        $(window.document.body).append(link);
        requirejs([page]);
    }
})  
requirejs.config(requirejsConfig);
//requirejs(['Root/Root']);
requirejs(['entry']);