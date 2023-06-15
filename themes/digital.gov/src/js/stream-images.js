jQuery(function ($) {
  // Gets all the image sizes as paths
  function get_all_image_sizes(uid, format, width, height) {
    var sizes = ["200", "400", "600", "800", "1200", "2400"]; // all image sizes
    var imgs = [];
    $.each(sizes, function (key, size) {
      if (width > size) {
        // big-bend_w200.jpg
        var img = `https://s3.amazonaws.com/digitalgov/${uid}_w${size}.${format}`;
        // big-bend_w200bw.jpg
        var bw_img = `https://s3.amazonaws.com/digitalgov/${uid}_w${size}bw.${format}`;
        imgs.push(img, bw_img);
      }
    });
    return imgs;
  }

  // The all-images JSON file is now included via the "footer--custom-js" partial
  // var all_images_json = '/images/v1/json/';

  // Gets all the image from the JSON file and appends them to #all-images div
  $.getJSON(all_images_json, function (data) {
    $.each(data, function (key, img) {
      var width = img.width;
      var height = img.height;
      var date = img.date;
      var uid = img.uid;
      var credit = img.credit;
      var caption = img.caption;
      var alt = img.alt;
      var format = img.format;
      var all_sizes = get_all_image_sizes(uid, format, width, height);

      // big-bend.jpg
      var filename = `${uid}.${format}`;
      // big-bend_jpg.jpg
      var proxy_img = `${root_url}/img/proxy/${uid}_${format}.${format}`;

      // If the image is greater than 400px
      var thumb;
      if (width > 400) {
        // get the w400 image
        // big-bend_w400.jpg
        thumb = `https://s3.amazonaws.com/digitalgov/${uid}_w400.${format}`;
      } else {
        // else get the original image (which should be less than 400px)
        // big-bend.jpg
        thumb = `https://s3.amazonaws.com/digitalgov/${uid}.${format}`;
      }

      var img_asset = `<div class="card-img">
        <div class="media">
          <img src="${thumb}">
          <p>${caption}</p>
        </div>
        <div class="img-data">
          <div class="box">
            <p><strong>uid:</strong> ${uid}</p>
            <p><strong>credit:</strong> ${credit}</p>
            <p><strong>caption:</strong> ${caption}</p>
            <p><strong>alt:</strong> ${alt}</p>
            <div class="code">
              <p class="label">Use this field in the front matter</p>
              <pre>primary_image: "${uid}"</pre>
            </div>
            <div class="code">
              <p class="label">Use this shortcode in the content body</p>
              <pre>{{< img src="${uid}" >}}</pre>
            </div>
            <p class="edit btn"><a target="_new" href="https://github.com/GSA/digitalgov.gov/edit/main/data/images/${uid}.yml" title="view on GitHub">Edit on GitHub »</a></p>
          </div>
        <p class="meta">Uploaded on ${date}</p>
        </div>
      </div>`;

      // Appends img_asset to DIV
      $("#stream-images").append(img_asset);
    });
  });
});
