package com.project.service;

import com.project.entity.UrlStorage;
import com.project.form.ContentsForm;

public interface HomeService {

   // URLを登録するメソッド
   void registBlogUrl(ContentsForm form);

   // URLを取得するメソッド
   public UrlStorage getBlogUrl();
    
}
