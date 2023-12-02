package com.project.service;

import com.project.entity.UrlStorage;
import com.project.form.ContentsForm;

import java.util.List;

public interface HomeService {

   // URLを登録するメソッド
   void registBlogUrl(ContentsForm form);

   // URLを取得するメソッド
   List<UrlStorage> getBlogUrls(int limit, int offset);
    
}
