// 当窗口加载时，调用apiFetch函数
window.onload = function() {
    apiFetch()
  }

  // 当按钮被点击时，调用apiFetch函数并传入按钮的值
  $("button").click(function() {
    var fired_button = $(this).val();
    apiFetch(fired_button);
  });
  
  // apiFetch函数定义，参数为按钮的值
  var apiFetch = function(fired_button) {
    // 定义API的基本URL和API key
    var baseUrl = 'https://pixabay.com/api/';
    var key = '2022970-be88b0f8e25d6d2c5d51db517';
    // 定义其他查询参数
    var orientation = "horizontal";
    var min_height = 500;
    var colors = "gray";
    var per_page = 30;
    var category = fired_button;
    var q = "";
    // 将所有参数拼接成完整的URL
    var finalURL 
    =  baseUrl + "?key=" 
    + key + "&orientation=" 
    + orientation + "&min_height=" 
    + min_height + "&colors=" 
    + colors + "&per_page=" 
    + per_page + "&q=" 
    + q + "&category=" 
    + category;
  
    // 使用fetch方法获取数据，解析为JSON格式，然后对数据进行处理
    fetch(finalURL)
      .then((res) => res.json())
      .then((data) => {
        // 定义output变量，存储HTML代码片段
        let output = '<h5 hidden>Images</h5>'
        // 遍历数据中的每个图片对象，并生成HTML代码
        data.hits.forEach(function(image){
          output += `
            <p class="item">
              <a class="image-link" href="${image.largeImageURL}">
                <img src="${image.largeImageURL}" alt="${image.tags}" >
              </a>    
            </p>
          `;
        });
        // 将生成的HTML代码插入到页面的output元素中
        document.getElementById('output').innerHTML = output;

        // Magnific Popup Initialization + Zoom in effect
            $('.image-link').magnificPopup({
              type:'image', mainClass: 'mfp-with-zoom',
              zoom: {enabled: true, duration: 300, easing: 'ease-in-out', opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
              }}
            });
  
        // Finishs of Magnific Popup
      })
  }