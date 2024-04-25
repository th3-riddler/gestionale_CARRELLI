function activate() {
    if (this.classList.contains("btn-accent")) {
        this.classList.remove("btn-accent");
        document.getElementById("formReservation").querySelector("button[type='submit']").setAttribute("disabled", "true");
        document.getElementById("technicianNote").setAttribute("disabled", "true");
        document.getElementById("technicianNote").value = "";
        document.getElementById("modalTeacherNote").querySelector("p").innerHTML = "";
        document.getElementById("teacherNote").classList.add("hidden");
        return;
    }

    document.querySelectorAll(".btn-accent").forEach((item) => item.classList.remove("btn-accent"));

    this.classList.add("btn-accent");
    document.getElementById("formReservation").querySelector("button[type='submit']").removeAttribute("disabled");
    document.getElementById("technicianNote").removeAttribute("disabled");

    document.getElementById("modalTeacherNote").querySelector("p").innerHTML = this.querySelector("input[type='hidden']").value;
    if (this.querySelector("input[type='hidden']").value === "") { document.getElementById("teacherNote").classList.add("hidden"); }
    else { document.getElementById("teacherNote").classList.remove("hidden"); }

    document.getElementById("formReservation").querySelectorAll("input[type='hidden']").forEach((item) => item.remove());
    let columnIndex = Array.from(this.parentElement.parentNode.children).findIndex((element) => element === this.parentElement) - 1;
    let date = document.querySelectorAll(".date")[columnIndex].textContent;
    let room = this.querySelector("span.room").textContent;
    let day = document.querySelectorAll(".day")[columnIndex].textContent;
    let hour = this.parentElement.parentNode.rowIndex;
    
    for (let i = 0; i < 4; i++) {
        let input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", ["date", "room", "weekday", "hour"][i]);
        input.setAttribute("value", [date, room, day, hour][i]);
        document.getElementById("formReservation").appendChild(input);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let current = document.getElementById("current");
    let dateQuery = new URLSearchParams(window.location.search).get("date");
    let current_date = dateQuery ? new Date(dateQuery) : new Date();
    let monday_week = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 1);
    let saturday_week = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 6);
    current.textContent = monday_week.toDateString() + " - " + saturday_week.toDateString();

    document.getElementById("previous").addEventListener("click", function() {
        let current = document.getElementById("current");
        let current_date = new Date(current.textContent.split(" - ")[0]);
        let monday_week = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - 6);
        window.location.href = window.location.href.split("?")[0] + "?date=" + monday_week.toISOString().split("T")[0];
    });

    document.getElementById("next").addEventListener("click", function() {
        let current = document.getElementById("current");
        let current_date = new Date(current.textContent.split(" - ")[0]);
        let monday_week = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() + 8);
        
        window.location.href = window.location.href.split("?")[0] + "?date=" + monday_week.toISOString().split("T")[0];
    });

    document.querySelectorAll(".reservation").forEach(reservation => { reservation.addEventListener("click", activate); });
});