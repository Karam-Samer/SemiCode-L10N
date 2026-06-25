function l10NHouseFilter(description) {
    let regex = /L10N House/gmi;
    return description.replaceAll(regex, "<span class='firstColor'>L10N</span> <span class='secondColor'>House</span>");
}

function openPopup(name, index) {
    if (name === "Services") {
        fillServices(index);
    }
    let popupEle = $(`.popup[data-name='${name}']`);
    popupEle.addClass("active");
    popupEle.fadeIn(1000);
    $("body").addClass("overflow-hidden");
}

function closePopup() {
    $(".popup").fadeOut(1000);
    $("body").removeClass("overflow-hidden");
}

function fillServices(index) {
    let service = services[index];
    $(`.popup[data-name='Services'] .box .body`).html(`
                        <h4 class="text-center mb-5 secondColor">${service.title}</h4>
                <div class="row mb-5">
                    <div class="col-lg-6 part1">
                        <div class="item">
                            <p>${l10NHouseFilter(service.description)}</p>
                        </div>
                    </div>
                    <div class="col-lg-6 part2">
                        <div class="item">
                            <img src="images/${service.img}" alt="" class="img-fluid rounded-2">
                        </div>
                    </div>
                </div>
                <div class="sections">
                    ${fillSection(service.sections)}
                </div>


    `);

}

function fillSection(sections) {
    let html =``;
    sections.forEach((section,index) => {
        html += `
                <div class="section ${index !=0 ? 'mt-3' : ''}">
                    <div class="head">
                        <h5 class="mb-3">${section.title}</h5>
                    </div>
                    <div class="body">
                        <ol>
                            ${fillLi(section.points)}
                        </ol>
                    </div>
                </div>
        `;
    });
    return html;
} 


function fillLi(li) {
    let html = ``;
    li.forEach(item => {
        html += `<li>${item}</li>`;
    });
    return html;
}

function TopOfPage(){
    $(window).scrollTop(0);
}