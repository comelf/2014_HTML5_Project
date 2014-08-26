

var holder = document.getElementById('holder'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      //dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    }, 
    support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    },
    acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    },
    progress = document.getElementById('uploadprogress'),
    fileupload = document.getElementById('upload');

"filereader formdata progress".split(' ').forEach(function (api) {
  if (tests[api] === false) {
    support[api].className = 'fail';
  } else {
    support[api].className = 'hidden';
  }
});

function previewfile(file) {
  if (tests.filereader === true && acceptedTypes[file.type] === true) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;

      //파일 사이즈 구하기
      image.width = 250; 
      holder.appendChild(image);
    };

    reader.readAsDataURL(file);
  }  else {
    holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
    console.log(file);
  }
}

function readfiles(files) {
    debugger;
    var formData = tests.formdata ? new FormData() : null;
    for (var i = 0; i < files.length; i++) {
      if (tests.formdata) formData.append('file', files[i]);
      previewfile(files[i]);
    }

    if (tests.formdata) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/server?');
      xhr.onload = function() {
        progress.value = progress.innerHTML = 100;
      };

      if (tests.progress) {
        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            progress.value = progress.innerHTML = complete;
          }
        }
      }

      xhr.send(formData);
    }
}



var DND = {
	dndHolder : document.getElementById('holder'),

	init : function() {

		this.dndHolder.addEventListener('dragenter', this.handleDragEnter, false);
		this.dndHolder.addEventListener('dragleave', this.handleDragLeave, false);
		this.dndHolder.addEventListener('drop', this.handleDragEnd, false);
	},

	handleDragEnter : function(e) {
		this.className = 'hover';
	},

	handleDragLeave : function(e) {
		this.className = '';
	},

	handleDragEnd : function(e) {

  		console.log("asd");
  		
	}
}


DND.init();


// if (tests.dnd) { 
//   holder.ondragover = function () { this.className = 'hover'; return false; };
//   holder.ondragend = function () { this.className = ''; return false; };
//   holder.ondrop = function (e) {
//     this.className = '';
//     e.preventDefault();
//     readfiles(e.dataTransfer.files);
//   }
// } else {
//   fileupload.className = 'hidden';
//   fileupload.querySelector('input').onchange = function () {
//     readfiles(this.files);
//   };
// }
