package com.internship.auctionapp.util;

import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@NoArgsConstructor
public abstract class PageableRequest<T> {
    protected Integer pageNumber;

    protected Integer pageSize;

    protected T sortCriteria;

    public PageableRequest(Integer pageNumber, Integer pageSize, T sortCriteria) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sortCriteria = sortCriteria;
    }

    public Pageable toPage() {
        Pageable page = PageRequest.of(pageNumber, pageSize);

        if (sortCriteria != null) {
            page = PageRequest.of(pageNumber, pageSize, (Sort) sortCriteria);
        }

        return page;
    }
}
