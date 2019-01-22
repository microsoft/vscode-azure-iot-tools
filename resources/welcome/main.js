let vscode;
$(function () {
    main();
});

function main() {
    vscode = acquireVsCodeApi();
    $("a").click((event) => {
        vscode.postMessage({
            href: event.target.href
        });
    });

    $(".interactive").click((event) => {
        if (!$(event.target).is("a") && !$(event.target).is(".detail") &&
            $(event.target).parents(".detail").length === 0) {
            $(event.currentTarget).find(".detail").toggle(1000);
            $(event.currentTarget).find(".arrow").toggleClass("arrow-up");
            vscode.postMessage({
                href: `toggle:${$(event.currentTarget).attr("id")}`
            });
        }
    });

    $("#never-show").change(function () {
        vscode.postMessage({
            neverShow: $(this).is(":checked")
        });
    });

    $(window).scroll(() => {
        let offset = 250;
        let duration = 600;
        if ($(this).scrollTop() >= offset) {
            $("#back-to-top").fadeIn(duration);
        } else {
            $("#back-to-top").fadeOut(duration);
        }
    });
}

let tabs = ["#simulation-tab", "#edge-tab", "#device-tab"];
function openTab(tab) {
    for(let i=0;i<tabs.length;i++)
    {
        $(tabs[i]).removeClass("selected");
        $(tabs[i].replace("tab","tutorial")).css("display", "none");
    }

    $(tab).addClass("selected");

    vscode.postMessage({
        tab: tab.replace("#","")
    });

    $(tab.replace("tab","tutorial")).css("display", "block");
}