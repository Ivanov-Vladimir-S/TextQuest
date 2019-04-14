
if (!(window as any).WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
};

const socket: WebSocket = new WebSocket("ws://localhost:8081");

const buttonsEl: HTMLElement | null = document.getElementById("buttons");
const textEl: HTMLElement | null = document.getElementById("text");

if(buttonsEl != null && textEl != null){

  socket.onmessage = function(event: MessageEvent): void {
    const content = JSON.parse(event.data);

    // buttonsEl.removeEventListener("click", (event: MouseEvent) => {
    //   if(event.target != null){
    //     const targetEl: HTMLElement | null = <HTMLElement> event.target;
    //     console.log(targetEl.dataset.id);
    //     socket.send(<string>targetEl.dataset.id);
    //   }
    // });

    while (buttonsEl.hasChildNodes()){
        buttonsEl.removeChild(buttonsEl.childNodes[0]);
    }

    let buttonsArray: HTMLElement[] = [];

    if(content.text != undefined){ 
      textEl.textContent = content.text;
    }
    for(let i: number = 0; i < content.choice.length; i++){
      buttonsArray[i] = document.createElement("button");
      buttonsArray[i].dataset.id = String(i);
      buttonsArray[i].textContent = content.choice[i];
      buttonsEl.appendChild(buttonsArray[i]);
    }

    buttonsEl.addEventListener("click", (event: MouseEvent) => {
      if(event.target != null){
        const targetEl: HTMLElement | null = <HTMLElement> event.target;
        console.log(targetEl.dataset.id);
        socket.send(<string>targetEl.dataset.id);
      }
    },{
      once: true
    })
  }
}