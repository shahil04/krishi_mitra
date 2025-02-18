class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            clearButton: document.querySelector('.clear__button')
        }

        this.state = false;
        this.messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    }

    display() {
        const {openButton, chatBox, sendButton, clearButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        clearButton.addEventListener('click', () => this.clearChat(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        // Update chat messages on page load
        this.updateChatText(chatBox);
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:8000/chatbot', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {  
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

            // Store chat messages in local storage
            localStorage.setItem('chatMessages', JSON.stringify(this.messages));
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    clearChat(chatbox) {
        this.messages = [];
        localStorage.removeItem('chatMessages');
        this.updateChatText(chatbox);
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;

    
          // Scroll to the bottom of the chatbox
    chatmessage.scrollTop = chatmessage.scrollHeight;

    }
}

const chatbox = new Chatbox();
chatbox.display();



// class Chatbox {
//     constructor() {
//         this.args = {
//             openButton: document.querySelector('.chatbox__button'),
//             chatBox: document.querySelector('.chatbox__support'),
//             sendButton: document.querySelector('.send__button')
            
//         }

//         this.state = false;
//         this.messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
//     }

//     display() {
//         const {openButton, chatBox, sendButton} = this.args;

//         openButton.addEventListener('click', () => this.toggleState(chatBox))

//         sendButton.addEventListener('click', () => this.onSendButton(chatBox))

//         const node = chatBox.querySelector('input');
//         node.addEventListener("keyup", ({key}) => {
//             if (key === "Enter") {
//                 this.onSendButton(chatBox)
//             }
//         })

//         // Update chat messages on page load
//         this.updateChatText(chatBox);
//     }

//     toggleState(chatbox) {
//         this.state = !this.state;

//         // show or hides the box
//         if(this.state) {
//             chatbox.classList.add('chatbox--active')
//         } else {
//             chatbox.classList.remove('chatbox--active')
//         }
//     }

//     onSendButton(chatbox) {
//         var textField = chatbox.querySelector('input');
//         let text1 = textField.value
//         if (text1 === "") {
//             return;
//         }

//         let msg1 = { name: "User", message: text1 }
//         this.messages.push(msg1);

//         fetch('http://127.0.0.1:8000/chatbot', {
//             method: 'POST',
//             body: JSON.stringify({ message: text1 }),
//             mode: 'cors',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//           })
//           .then(r => r.json())
//           .then(r => {  
//             let msg2 = { name: "Sam", message: r.answer };
//             this.messages.push(msg2);
//             this.updateChatText(chatbox)
//             textField.value = ''

//             // Store chat messages in local storage
//             localStorage.setItem('chatMessages', JSON.stringify(this.messages));
//         }).catch((error) => {
//             console.error('Error:', error);
//             this.updateChatText(chatbox)
//             textField.value = ''
//           });
//     }

//     updateChatText(chatbox) {
//         var html = '';
//         this.messages.slice().reverse().forEach(function(item, index) {
//             if (item.name === "Sam")
//             {
//                 html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
//             }
//             else
//             {
//                 html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
//             }
//           });

//         const chatmessage = chatbox.querySelector('.chatbox__messages');
//         chatmessage.innerHTML = html;

//           // Scroll to the bottom of the chatbox
//     chatmessage.scrollTop = chatmessage.scrollHeight;

//     }
// }

// const chatbox = new Chatbox();
// chatbox.display();


// // class Chatbox {
// //     constructor() {
// //         this.args = {
// //             openButton: document.querySelector('.chatbox__button'),
// //             chatBox: document.querySelector('.chatbox__support'),
// //             sendButton: document.querySelector('.send__button')
// //         }

// //         this.state = false;
// //         this.messages = [];
// //     }

// //     display() {
// //         const {openButton, chatBox, sendButton} = this.args;

// //         openButton.addEventListener('click', () => this.toggleState(chatBox))

// //         sendButton.addEventListener('click', () => this.onSendButton(chatBox))

// //         const node = chatBox.querySelector('input');
// //         node.addEventListener("keyup", ({key}) => {
// //             if (key === "Enter") {
// //                 this.onSendButton(chatBox)
// //             }
// //         })
// //     }

// //     toggleState(chatbox) {
// //         this.state = !this.state;

// //         // show or hides the box
// //         if(this.state) {
// //             chatbox.classList.add('chatbox--active')
// //         } else {
// //             chatbox.classList.remove('chatbox--active')
// //         }
// //     }

// //     onSendButton(chatbox) {
// //         var textField = chatbox.querySelector('input');
// //         let text1 = textField.value
// //         if (text1 === "") {
// //             return;
// //         }

// //         let msg1 = { name: "User", message: text1 }
// //         this.messages.push(msg1);

// //         fetch('http://127.0.0.1:8000/chatbot', {
// //             method: 'POST',
// //             body: JSON.stringify({ message: text1 }),
// //             mode: 'cors',
// //             headers: {
// //               'Content-Type': 'application/json'
// //             },
// //           })
// //           .then(r => r.json())
// //           .then(r => {  
// //             let msg2 = { name: "Sam", message: r.answer };
// //             this.messages.push(msg2);
// //             this.updateChatText(chatbox)
// //             textField.value = ''

// //         }).catch((error) => {
// //             console.error('Error:', error);
// //             this.updateChatText(chatbox)
// //             textField.value = ''
// //           });
// //     }

// //     updateChatText(chatbox) {
// //         var html = '';
// //         this.messages.slice().reverse().forEach(function(item, index) {
// //             if (item.name === "Sam")
// //             {
// //                 html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
// //             }
// //             else
// //             {
// //                 html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
// //             }
// //           });

// //         const chatmessage = chatbox.querySelector('.chatbox__messages');
// //         chatmessage.innerHTML = html;

// //         // Scroll to the bottom of the chatbox
// //     chatmessage.scrollTop = chatmessage.scrollHeight;

// //     }
// // }


// // const chatbox = new Chatbox();
// // chatbox.display();