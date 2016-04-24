let requirejsConfig={
    baseUrl: '/dist/js',
    paths: {
        app: '../app',
        jquery:'jquery-2.2.1.min',
        react:'react',
        redux:'redux.min',
        "react-redux":'react-redux',
        "react-dom":'react-dom',
        md5:'md5',
    }
};
let pages=["chat","login","logout"];
pages.forEach(function(v,i){
    requirejsConfig.paths[v]=v+"/"+v;
})
define("entry",["common","jquery","react","redux","react-redux","react-dom","md5"],function(common,j,r,rrr,rr,rd,md5){   
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