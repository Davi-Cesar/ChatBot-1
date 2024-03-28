package com.project.chatbot;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {

    @MessageMapping("/enviarMensagem")
    @SendTo("/canal")
    public Mensagem sendMessage(Mensagem mensagem) {
        return mensagem;
    }
}
