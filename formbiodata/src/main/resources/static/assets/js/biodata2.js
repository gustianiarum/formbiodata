var tableBiodata = {
    create: function () {
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/person',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
            	console.log(res);
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "NIK",
                                data: "nik"
                            },
                            {
                                title: "Nama",
                                data: "name"
                            },
                            {
                                title: "Alamat",
                                data: "address"
                            },
                            {
                                title: "Nomor Handphone",
                                data: "hp"
                            },
                             {
                                title: "Tanggal Lahir",
                                data: "tgl"
                            },
                             {
                                title: "Tempat Lahir",
                                data: "tempatLahir"
                            },
                            {
                                title: "Edit Data",
                                data: null,
                                render: function (data, type, row) {
                                console.log(data);
                                    return "<button class='btn-primary' onclick=formBiodata.setEditData('" + data.idPerson + "')>Edit</button>"
                             }
                            },
                            {
                                title: "Pendidikan",
                                data: null,
                                render: function (data, type, row) {
                                return '<a href="/base/index6/' + data.idPerson+ '">Tambah Pendidikan</a>'
                             }
                            }
                        ]
                    });

                } else {

                }
            },
            error: function (err) {
                console.log(err);
            }
        });

    }
};

var formBiodata = {
    resetForm: function () {
        $('#form-biodata')[0].reset();
        $('#idBio').val("");
        $('#idPerson').val("");
    },
	
	saveForm: function () {
        if ($('#form-biodata').parsley().validate()) {
            var dataResult = getJsonForm($('#form-biodata').serializeArray(), true);

            $.ajax({
                url: '/person',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataResult),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                    if($('#nik').val().length != 16){
						Swal.fire({
         				icon: 'error',
						title: 'Oops...',
         				text: 'Jumlah digit NIK tidak sama dengan 16'
      					})
                  } else{
                     var dob = $('#tgl').val();
         			dob = new Date(dob);
         			var today = new Date();
         			var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
         			if(age < 30){
          				Swal.fire({
          					icon: 'error',
          					title: 'Oops...',
          					text: 'Usia anda kurang dari 30'
       						})
      					} else{
      						tableBiodata.create();
                         	$('#modal-biodata').modal('hide')
         					const Toast = Swal.mixin({
          					toast: true,
          					position: 'top-end',
          					showConfirmButton: false,
          					timer: 3000,
          					timerProgressBar: true,
          					onOpen: (toast) => {
            				toast.addEventListener('mouseenter', Swal.stopTimer)
            				toast.addEventListener('mouseleave', Swal.resumeTimer)
          				}
         				})
       						Toast.fire({
          						icon: 'success',
          						title: 'Data berhasil masuk'
         				})
      					}
                    }
                }
                },
                			error: function (err) {
                    		console.log(err);
                }
            });
     }
    },
    setEditData: function (idPerson) {
        formBiodata.resetForm();

        $.ajax({
            url: '/person/'+ idPerson,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-biodata').fromJSON(JSON.stringify(res));
                    $('#modal-biodata').modal('show')

                } else {

                }
            },
            	error: function (err) {
                console.log(err);
            }
        });


    }
};
