const add = document.querySelector("#add");
        const courseCode = document.querySelector("#course-code");
        const unitLoad = document.querySelector("#unit-load");
        const grade = document.querySelector("#grade");
        const tbody = document.querySelector("#tbody");
        const tfoot = document.querySelector("#tfoot");
        const table = document.querySelector("#table");
        const calcGp = document.querySelector("#calc-gp");
        const deleteSelected = document.querySelector("#delete-selected");
        const clear = document.querySelector("#clear");

        let gpArry = [];

        add.addEventListener("click", () => {
            if (
                courseCode.value === "" ||
                unitLoad.value <= 0 ||
                grade.selectedIndex === 0
            ) {
                alert("Wrong input, check and try again");
            } else {
                const tr = document.createElement("tr");
                const tdCheckbox = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "select-checkbox";
                tdCheckbox.appendChild(checkbox);
                tr.appendChild(tdCheckbox);
                const tdCourseCode = document.createElement("td");
                tdCourseCode.innerHTML = courseCode.value;
                const tdUnitLoad = document.createElement("td");
                tdUnitLoad.innerHTML = unitLoad.value;
                const tdGrade = document.createElement("td");
                tdGrade.innerHTML = grade.options[grade.selectedIndex].text;
                tr.appendChild(tdCourseCode);
                tr.appendChild(tdUnitLoad);
                tr.appendChild(tdGrade);
                tbody.appendChild(tr);
                table.classList.remove("display-none");
                calcGp.classList.remove("display-none");
                clear.classList.remove("display-none");
                deleteSelected.classList.remove("display-none");
                gpArry.push({
                    unitLoad: unitLoad.value,
                    grade: grade.options[grade.selectedIndex].value,
                });
                console.log(gpArry);
                courseCode.value = "";
                unitLoad.value = "";
                grade.selectedIndex = "0";
            }
        });

        deleteSelected.addEventListener("click", () => {
            const checkboxes = document.querySelectorAll(".select-checkbox:checked");

           if (checkboxes.length > 0) {
        const confirmed = window.confirm("Are you sure you want to delete selected courses?");
        
        if (confirmed) {
            checkboxes.forEach((checkbox) => {
                const row = checkbox.closest("tr");
                const index = Array.from(row.parentNode.children).indexOf(row);
                gpArry.splice(index, 1);
                row.remove();
            });

            updateGPA(); 
        }
    } else {
        alert("Please select at least one course to delete.");
    }

        });

        calcGp.addEventListener("click", () => {
            updateGPA();
        });

        function updateGPA() {
            let unitLoads = 0,
                productOfUnitLoadsAndGrades = 0,
                sumOfProductOfUnitLoadsAndGrades = 0;

            gpArry.forEach((result) => {
                unitLoads += parseInt(result.unitLoad);
                productOfUnitLoadsAndGrades =
                    parseInt(result.unitLoad) * parseInt(result.grade);
                sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
            });

            const tr = document.createElement("tr");

            tdTotalUnitLoad = document.createElement("td");
            tdTotalUnitLoad.innerHTML = `Your total unit load is ${unitLoads}`;

            tdGpa = document.createElement("td");
            tdGpa.setAttribute("colspan", "3");
            tdGpa.innerHTML = `Your GPA is ${(sumOfProductOfUnitLoadsAndGrades / unitLoads).toFixed(2)} `;

            tr.appendChild(tdTotalUnitLoad);
            tr.appendChild(tdGpa);

            if (tfoot.querySelector("tr") !== null) {
                tfoot.querySelector("tr").remove();
            }

            tfoot.appendChild(tr);

            
            if (gpArry.length === 0) {
                deleteSelected.classList.add("display-none");
            }
        }
        clear.addEventListener("click", () => {
          gpArry = [];
          tbody.querySelectorAll("*").forEach((child) => child.remove());
          if (tfoot.querySelector("tr") !== null) {
            tfoot.querySelector("tr").remove();
          }
        
          table.classList.add("display-none");
          calcGp.classList.add("display-none");
          clear.classList.add("display-none");
          deleteSelected.classList.add("display-none");
        });