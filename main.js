console.log("Gaza Aid Hub Loaded Successfully");

// ======= مصفوفة المساعدات =======
let aids = [
    { type: "غذاء", area: "غزة", date: "10-1-2026", status: "متاح" },
    { type: "دواء", area: "خانيونس", date: "12-1-2026", status: "مكتمل" },
    { type: "مياه", area: "رفح", date: "15-1-2026", status: "متاح" }
];

let table = $("#aidTable");

// ======= عرض المساعدات + فلترة =======
function renderAids(selected = "all") {
    table.html("");
    aids.forEach(function(aid) {
        if(selected === "all" || aid.area === selected) {
            let statusClass = aid.status === "متاح" ? "text-success" : "text-danger";
            table.append(`
                <tr>
                    <td>${aid.type}</td>
                    <td>${aid.area}</td>
                    <td>${aid.date}</td>
                    <td class="${statusClass}">${aid.status}</td>
                </tr>
            `);
        }
    });
}

// Initial render
renderAids();

// Filter by area
$("#filterArea").on("change", function() {
    let selected = $(this).val();
    renderAids(selected);
});
$(".video-thumbnail").on("click", function() {
    $(this).hide(); // اخفاء الصورة
    $("#videoPlayer").removeClass("d-none"); // اظهار الفيديو
});

// ======= Form Validation + Submit =======
$("#helpForm").on("submit", function(e) {
    e.preventDefault();
    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let area = $("#area").val();
    let type = $("#type").val();

    if(name === "" || email === "" || area === "" || type === "") {
        alert("يرجى تعبئة جميع الحقول المطلوبة!");
        return;
    }

    $("#successMsg").removeClass("d-none");
    $(this)[0].reset();
    setTimeout(function() {
        $("#successMsg").addClass("d-none");
    }, 5000);
});

// ======= Fade-in عند ظهور الفيديو =======
$(window).on("scroll", function() {
    let mediaTop = $("#media").offset().top - $(window).height() + 100;
    if($(window).scrollTop() > mediaTop) {
        $("#media").fadeIn(1000);
    }
});
$("#media").hide();