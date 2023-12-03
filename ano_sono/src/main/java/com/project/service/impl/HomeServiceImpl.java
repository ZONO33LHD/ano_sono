package com.project.service.impl;

import com.project.entity.UrlStorage;
import com.project.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.HomeMapper;
import com.project.form.ContentsForm;

import java.util.List;

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
	public List<UrlStorage> getBlogUrls(int limit, int offset) {

		List<UrlStorage> result = homeMapper.getBlogUrls(limit, offset);

		return result;
	}

	// 登録されているURLの総数を取得するメソッド
	@Override
	public int getCountUrls() {

		return homeMapper.getCountUrls();
	}

	// 登録されている情報の編集更新処理
	@Override
	public void updateBlogContents(ContentsForm form) {

		homeMapper.updateBlogContents(form);
	}

	// 登録されている情報の削除処理
	@Override
	public void deleteBlogContents(Long id) {

		homeMapper.deleteBlogContents(id);
	}
}
