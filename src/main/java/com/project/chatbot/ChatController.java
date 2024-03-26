package com.project.chatbot;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    private final ChatBot chatBot;

    public ChatController(ChatBot chatBot) {
        this.chatBot = chatBot;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody Message message) {
        String response = chatBot.respondToMessage(message.getContent());
        return "{\"response\": \"" + response + "\"}";
    }
}
