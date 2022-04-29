import menuItems from "./menu-items.js";

const amIPages = window.location.pathname.split("/")[1];
const whoAmI = window.location.pathname.split("/").pop();

menuItems.forEach((element)=>{
    const menuContainer = document.querySelector("#sidebar");
    const menu = menuContainer.querySelector(".nav");

    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    const navLink = document.createElement("a");
    navLink.classList.add("nav-link");

    if(amIPages==="pages" && element.href!=="index.html"){
       navLink.href = element.href;
    }else if(amIPages==="pages" && element.href==="index.html"){
        navLink.href = `../${element.href}`;
    }else if((amIPages==="index.html" || amIPages=="") && element.href !== "index.html"){
        navLink.href = `/pages/${element.href}`;
    }else{
        navLink.href = element.href;
    }

    if(whoAmI === element.href){
        navItem.classList.add("active");
    }

    const navItemIcon = document.createElement("i");
    navItemIcon.classList.add(element.icon ,"menu-icon");
    const navItemTitle = document.createElement("span");
    navItemTitle.classList.add("menu-title");
    navItemTitle.innerText = element.title;

    navItem.appendChild(navLink);
    navLink.append(navItemIcon, navItemTitle);

    menu.appendChild(navItem);
})
    
    






