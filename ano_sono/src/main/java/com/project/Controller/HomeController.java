package com.project.Controller;


import com.project.entity.UrlStorage;
import com.project.service.HomeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.project.form.ContentsForm;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;


@RestController
public class HomeController {
	
	Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private HomeService homeService;

	private List<UrlStorage> urlList;

	@Value("${spring.application.name}")
	private String name;
	

	// URL登録処理
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/api/blog")
	public String handlePostRequest(@RequestBody ContentsForm form) {
		logger.info(name);
		homeService.registBlogUrl(form);

		return "redirect:/";
	}

	// URL取得処理
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/api/blog/get")
	public List<UrlStorage> handleGetRequest() {
		logger.info(name);

		urlList = homeService.getBlogUrls();
		System.out.println(urlList);
		return urlList;
	}
}
