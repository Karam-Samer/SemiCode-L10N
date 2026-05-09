let services = null,
    sectors = null,
    languages = null,
    $navLinks = $(".nav-link");


(async function () {
    let response = await fetch("https://semicode.tech/api/v1/l10nhouse/services"),
        data = await response.json();
    services = data;

    services.forEach((service, index) => {
        $("#Services .content .row").append(`
            <div class="col-md-6 wow ${index % 2 === 0 ? 'animate__backInLeft' : 'animate__backInRight'}" data-wow-duration="1s" data-wow-delay="0.${(index + 1) * 2}s">
                        <div class="item text-center rounded-4 py-4">
                            <img src="images/${service.icon}" alt="">
                            <h5 class="my-3">${service.title}</h5>
                            <p>${l10NHouseFilter(service.description.substring(0, 150))}...
                            <span class="firstColor" onclick="openPopup('Services', ${index})">Read More</span></p>
                        </div>
                    </div>
        `);
    });


    let response2 = await fetch("https://semicode.tech/api/v1/l10nhouse/sectors"),
        data2 = await response2.json();
    sectors = data2;

    sectors.forEach((sector) => {
        $(`.popup[data-name="Sectors"] .body .row`).append(`
            <div class="col-lg-3 mb-4">
                        <div class="item text-center p-2">
                            <img src="images/sec/${sector.icon}" class="mb-3">
                            <p>${sector.name}</p>
                        </div>
                    </div>
        `);

    });
    let response3 = await fetch(`https://semicode.tech/api/v1/l10nhouse/languages`),
        data3 = await response3.json();
    languages = data3;

    languages.forEach((language) => {
        $(`.popup[data-name="Languages"] .body `).append(`
                <div class="item">
                    <h4>${language.continent}</h4>
                    <ul class="p-0 list-unstyled">
                        ${language.languages.map(lang => `<li><i class="fa-regular fa-circle-dot"></i> ${lang}</li>`).join('')}
                    </ul>
                </div>
            `);
    });


    new WOW({
        animateClass: 'animate__animated'
    }).init();
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            margin: 10,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                },
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
            }

        });
    });
})()

$(".popup").click(function (e) {
    closePopup();
});

$(".popup .box").click(function (e) {
    e.stopPropagation();
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $("nav").addClass("scrolled");
        $("#Top").addClass("active");
    } else {
        $("nav").removeClass("scrolled");
        $("#Top").removeClass("active");
    }

    let $sections = $("section,header");
    $sections.each(function (index, ele) {
        let top = $(ele).offset().top - $("nav").outerHeight(true);
        if ($(window).scrollTop() >= top) {
            $navLinks.removeClass("active");
            $navLinks.filter(`[href="#${$(ele).attr("id")}"]`).addClass("active");
        }
    });
});

$navLinks.click(function (e) {
    e.preventDefault();
    let sectionId = $(this).attr("href"),
        sectionEle = $(sectionId),
        sectionTop = sectionEle.offset().top,
        heightOfNav = $("nav").outerHeight(true);

    $(window).scrollTop(sectionTop - heightOfNav);
    $navLinks.removeClass("active");
    $(this).addClass("active");
});


$(".loading").fadeOut(5000);