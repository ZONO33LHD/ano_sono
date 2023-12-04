package com.project.Controller;


import com.project.entity.UrlStorage;
import com.project.form.SearchForm;
import com.project.service.HomeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.project.form.ContentsForm;

import java.util.*;


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
	public List<UrlStorage> handleGetRequest(@RequestParam int startIndex) {
		logger.info(name);
		int limit = 5;
		urlList = homeService.getBlogUrls(limit, startIndex);
		System.out.println();
		return urlList;
	}
	// 登録されているURLの総数を取得する処理
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/api/blog/count")
	public int handleGetCountRequest() {
		logger.info(name);
		int countList = homeService.getCountUrls();
		return countList;
	}

	// 登録されている情報の編集更新処理
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/api/blog/edit/{id}")
	public void handlePutRequest(@PathVariable("id") Long id, @RequestBody ContentsForm form) {
		logger.info(name);
		homeService.updateBlogContents(form);
	}

	// 登録されている情報の削除処理
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/api/blog/delete/{id}")
	public void handleDeleteRequest(@PathVariable("id") Long id) {
		logger.info(name);
		homeService.deleteBlogContents(id);
	}

	// 検索処理
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/api/blog/search")
	public List<UrlStorage> handleSearchRequest(@RequestBody SearchForm searchForm) {
		return homeService.getSearchResult(searchForm);
	}
}

