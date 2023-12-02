package com.project.mapper;

import com.project.entity.UrlStorage;
import org.apache.ibatis.annotations.Mapper;

import com.project.form.ContentsForm;

import java.util.List;

@Mapper
public interface HomeMapper {

	void registBlogUrl(ContentsForm form);

	List<UrlStorage> getBlogUrls();
}
