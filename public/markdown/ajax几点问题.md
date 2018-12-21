web-hydtype
#### Form表单上传文件
```bash
const formDara = new FormData($("#uploadForm")[0]);
   $.ajax({
            type: 'POST',
            url: '',
            data: formDara,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
              // xhr.setRequestHeader("Authorization", 'Token ' + window.localStorage.getItem('nextToken'));
              // xhr.setRequestHeader("Content-Type", " multipart/form-data; boundary=----------------------------4ebf00fbcf09");
              // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            },
            success: function () {
              alert("批量添加成功")
            }
   });
```