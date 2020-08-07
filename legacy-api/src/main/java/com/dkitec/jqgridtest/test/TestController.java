package com.dkitec.jqgridtest.test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    private static final Logger LOG = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/get")
    public Map<String, Object> getTest(@RequestParam(name="key", required=false) String key) {
        LOG.info("getTest: {}", key);

        Map<String, Object> map = new HashMap<>();
        map.put("key", key);
        map.put("success", true);
        map.put("legacy", true);
        return map;
    }

    @PostMapping("/post")
    public Map<String, Object> postTest(@RequestBody Map<String, Object> reqMap) {
        LOG.info("postTest: {}", reqMap);

        Map<String, Object> map = new HashMap<>(reqMap);
        map.put("success", true);
        map.put("legacy", true);
        return map;
    }

}
