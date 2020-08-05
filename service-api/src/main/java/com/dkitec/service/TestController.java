package com.dkitec.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @Autowired
    private Environment environment;

    @GetMapping("/get")
    public Map<String, Object> getTest(@RequestParam(name="key", required=false) String value) {
        String port = environment.getProperty("local.server.port");
        System.out.println("getTest at the port " + port);
        Map<String, Object> map = new HashMap<>();
        map.put("key", value);
        map.put("port", port);
        map.put("success", true);
        return map;
    }

    @PostMapping("/post")
    public Map<String, Object> postTest(@RequestBody Map<String, Object> reqMap) {
        String port = environment.getProperty("local.server.port");
        System.out.println("postTest at the port " + port);
        Map<String, Object> map = new HashMap<>(reqMap);
        map.put("port", port);
        map.put("success", true);
        return map;
    }

}
