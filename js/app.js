window.onload = () => {
    const main = {
        init: function() {
            this.toDoList();
        },
        toDoList: () => {
            pullData();

            const openFormAdd = document.querySelector(".open");
            const closeFormAdd = document.querySelector(".close");
            const formAdd = document.querySelector(".form__add");
            const formDel = document.querySelector(".del")
            const btnSort = document.querySelector(".btn__sort");
            const listSort = document.querySelector(".list__sort");
            const linkSort = listSort.querySelectorAll("li")
            const inputName = document.querySelector("#name");
            const selectStatus = document.querySelector("#selectStatus");
            const save = document.querySelector("#save");
            const btnEdit = document.querySelectorAll(".btn__edit");
            const btnDel = document.querySelectorAll(".btn__del")
            const btnYes = document.querySelector(".yes")
            const btnNo = document.querySelector(".no")
            let flag;


            // open close form add  , sort
            openFormAdd.addEventListener("click", () => {
                flag = "add"
                inputName.value = "";
                selectStatus.value = "";
                console.log(selectStatus.value);
                formAdd.classList.add("active");
            })

            closeFormAdd.addEventListener("click", () => {
                formAdd.classList.remove("active")
            })

            btnSort.addEventListener("click", () => {
                listSort.classList.toggle("active")
            })

            linkSort.forEach((item) => {
                item.addEventListener("click", () => {
                    listSort.classList.remove("active")
                })
            })


            // Add 
            save.addEventListener("click", () => {
                let validateForm = validate();
                if (validateForm === true) {
                    if (flag == "add") {
                        addData()
                    }
                }
            });

            // Edit 
            btnEdit.forEach((item, index) => item.addEventListener("click", () => {
                flag = "edit"
                formAdd.classList.add("active");
                
                dataForm = JSON.parse(localStorage.getItem("data"));
                inputName.value = dataForm[index].name;
                selectStatus.value = dataForm[index].status;

                save.addEventListener("click", () => {
                    validate();
                    if (validate()) {
                        if (flag == "edit") {
                            editData(index)
                        }
                    }
                })
            }));

            // delete
            btnDel.forEach((a, b) => a.addEventListener("click", () => {
                formDel.classList.add("active");
                btnYes.addEventListener("click", () => {
                    deleteData(b);

                });
                btnNo.addEventListener("click", () => {
                    formDel.classList.remove("active")
                })
            }));
            // search
            const search = document.querySelector("#search");
            const findBtn = document.querySelector(".find");
            findBtn.addEventListener("click", () => {
                searchData(search.value);
            })

            const sub_search = document.querySelector("#sub__search")
            sub_search.addEventListener("keyup", () => {
                subSearchData(sub_search.value);
            });


            const abc = document.querySelector("#sub__selectStatus");

            abc.addEventListener("change", () => {
                searchStatusData(abc.value);
            })

            // sort 


            // Data storage 

            //validate 
            function validate() {
                const errorText = document.querySelector(".error");
                const errorStatus = document.querySelector(".error-status");
                if (inputName.value.trim() == "") {
                    errorText.style.cssText = "display : block;"
                }else {
                    errorText.style.cssText = "display : none;"
                }

                if (selectStatus.value == "") {
                    errorStatus.style.cssText = "display : block;"
                } else {
                    errorStatus.style.cssText = "display : none;"
                }

                if(inputName.value.trim() == "" || selectStatus.value == "") {
                    return false;
                } else {
                    return true;
                }

            }

            // create new contructor 

            function objectForm(id, name, status) {
                this.id = id;
                this.name = name;
                this.status = status
            }

            // resest form onload 

            function resestForm() {
                inputName.value = '';
                selectStatus.value = '';
            }

            // push data 

            function pushData() {
                var dataForm = JSON.parse(localStorage.getItem("data"));
                if (dataForm === null) {
                    dataForm = []
                };
                var objForm = new objectForm(dataForm.length + 1, inputName.value, selectStatus.value);
                dataForm.push(objForm);
                localStorage.setItem("data", JSON.stringify(dataForm));
            }

            // pull Data 
            function pullData() {
                dataForm = JSON.parse(localStorage.getItem("data"));
                if (dataForm === null) {
                    return;
                }
                document.querySelector('tbody').innerHTML = '';
                dataForm.forEach((item) => {
                    let tr = document.createElement("tr");
                    var contentForm = `
                        <td class="id">${item.id}</td>
                        <td class="title__name">${item.name}</td>
                        <td>
                            <span>${item.status}</span>
                        </td>
                        <td>
                            <a href="#" class="btn__edit btn__all1"> <i class="fa fa-pencil" aria-hidden="true"></i>Sửa</a>
                            <a href="#" class="btn__del btn__all2 "> <i class="fa fa-trash-o" aria-hidden="true"></i> Xóa</a>
                        </td>
                    `;
                    tr.innerHTML = contentForm;
                    document.querySelector('tbody').appendChild(tr)
                });

            }

            // add Data 
            function addData() {
                pushData();
                resestForm();
                location.reload()
            }

            // edit 
            function editData(index) {
                dataForm = JSON.parse(localStorage.getItem("data"));
                dataForm[index].name = inputName.value;
                dataForm[index].status = selectStatus.value;

                localStorage.setItem("data", JSON.stringify(dataForm));
                location.reload();
                // resestForm();
            }

            //delete 
            function deleteData(index) {
                dataForm = JSON.parse(localStorage.getItem("data"));
                dataForm.splice(index, 1);
                dataForm.forEach((item, index) => item.id = index + 1);
                localStorage.setItem("data", JSON.stringify(dataForm));
                location.reload()
            }

            //search 

            function searchData(inputSearch) {
                var items = document.querySelectorAll("tbody tr");
                items.forEach((item, index) => {
                    var value = item.querySelector(".title__name").textContent;
                    if (value.toUpperCase().includes(inputSearch.toUpperCase())) {
                        items[index].style.cssText = "display : talbe-row"
                    } else {
                        items[index].style.cssText = "display: none;"
                    }
                })
            }

            function subSearchData(inputSearch) {
                var items = document.querySelectorAll("tbody tr");
                items.forEach((item, index) => {
                    let value = item.querySelector('.title__name').textContent;
                    if (value.toUpperCase().includes(inputSearch.toUpperCase())) {
                        items[index].style.cssText = "display : table-row;"
                    } else {
                        items[index].style.cssText = "display : none ;"
                    }
                })
            };

            function searchStatusData(searchStatus) {
                dataForm = JSON.parse(localStorage.getItem("data"));
                dataForm.forEach((item) => {
                    var items = document.querySelectorAll("tbody tr");
                    if (item.status === searchStatus) {
                        for (let i = 0; i < items.length; i++) {
                            var c = items[i].querySelector("span").textContent;
                            if (c === searchStatus) {
                                console.log("Ẩn:" + searchStatus);
                                items[i].style.cssText = "display : table-row";
                            } else {
                                items[i].style.cssText = "display : none;"
                            }
                        }
                    } else {
                        items.forEach(item => {
                            item.style.cssText = "display : none";
                        })
                    }
                    if (searchStatus == "Tất Cả") {
                        items.forEach(item => {
                            item.style.cssText = "display : table-row";
                        })
                    }
                })

                localStorage.setItem("data", JSON.stringify(dataForm))
            }

        }
    }

    main.init()
}