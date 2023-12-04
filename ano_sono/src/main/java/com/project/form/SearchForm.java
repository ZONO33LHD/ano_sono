package com.project.form;

import lombok.Data;

/**
 * 検索フォーム
 */
@Data
public class SearchForm {
    private String title;
    private String description;
    private String startIndex;
    private String limit;
}
