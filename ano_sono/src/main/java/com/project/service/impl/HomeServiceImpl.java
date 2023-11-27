package com.project.service.impl;

import com.project.entity.UrlStorage;
import com.project.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.HomeMapper;
import com.project.form.ContentsForm;

/**
 * HoME画面サービスクラス
 *
 * @Author s.nakazono
 */
@Service
public class HomeServiceImpl implements HomeService {
    
	@Autowired
	private HomeMapper homeMapper;

	// URLを登録するメソッド
	@Override
	public void registBlogUrl(ContentsForm form) {

		homeMapper.registBlogUrl(form);
	}

	// URLを取得するメソッド
	@Override
	public UrlStorage getBlogUrl() {

		return homeMapper.getBlogUrl();
	}
}
