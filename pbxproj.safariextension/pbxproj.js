function configureCollapse(element) {
    element.setAttribute("aria-label", "Collapse file");
    element.innerHTML = "Collapse";
}

function configureExpand(element) {
    element.setAttribute("aria-label", "Expand file");
    element.innerHTML = "Expand";
}

function handleCollapseClick() {
    var diffElement = this.parentElement.parentElement.nextElementSibling;
    diffElement.hidden = !diffElement.hidden;
    if (diffElement.hidden) {
        configureExpand(this);
    } else {
        configureCollapse(this);
    }
}

function hide_pbxproj() {
    var headers = document.querySelectorAll(".file-header");
    for (var i = 0; i < headers.length; i++) {

        var header = headers[i];
        var dataPath = header.attributes["data-path"];
        if (!dataPath) {
            continue;
        }

        var diffBody = header.nextElementSibling;
        var shouldHide = false;
        if (dataPath.value.indexOf(".xcodeproj/project.pbxproj") != -1) {
            shouldHide = true;
        }

        var actions = header.querySelector(".file-actions");
        var element = actions.querySelector("a.pbxproj-collapse") 
        if (!element) {
            //Create a button dynamically.   
            element = document.createElement("a");
            element.href = "javascript:void(0)";
            element.className = "btn btn-sm tooltipped tooltipped-nw pbxproj-collapse";
            element.rel = "nofollow";
            if (shouldHide) {
                configureExpand(element);
            } else {
                configureCollapse(element);
            }
            
            actions.appendChild(element);

            element.addEventListener('click', handleCollapseClick);

            if (shouldHide) {
                diffBody.hidden = true;
            }
        }
    }
}

hide_pbxproj();

// We want to support dynamically added content so on every document change
// do a quick check of the URLs. This will also most likely kick it to action initially.

var observer = new WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        hide_pbxproj();
    });
});

var config = {
    attributes: false,
    childList: true,
    characterData: true,
    subtree: true
};
observer.observe(document.body, config);
