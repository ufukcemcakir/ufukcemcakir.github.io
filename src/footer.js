export function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
  
    const copyright = document.createElement("p");
    copyright.textContent = `Copyright © ${new Date().getFullYear()} ufukcemcakir`;
  
    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/ufukcemcakir";
  
    const githubIcon = document.createElement("i");
    githubIcon.classList.add("fab", "fa-github");
  
    githubLink.appendChild(githubIcon);
    footer.appendChild(copyright);
    footer.appendChild(githubLink);
  
    return footer;
}