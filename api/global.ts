import { Category } from '@/entities/category';
import { SearchResponse } from '@/entities/response/base';
import { SystemSettings } from '@/entities/systemSettings';
import { Tag } from '@/entities/tag';
import request from '@/utils/request';

// 获取标签
export const getTags = () =>
  request.get<SearchResponse<Tag>>('/tag').then(res => res.data);

// 获取分类
export const getCategories = () =>
  request.get<SearchResponse<Category>>('/category').then(res => res.data);

// 获取全局配置
export const getSystemSettings = () =>
  request.get<SystemSettings>('/config').then(res => res.data);

// 获取parse后的全局配置
export const fetchSystemSettings = () =>
  getSystemSettings().then(data => {
    return data;
  });

export const fetchTags = () => getTags().then(res => res.data);

export const fetchCategories = () => getCategories().then(res => res.data);

// 获取全局数据
export const fetchGlobalData = () =>
  Promise.all([fetchSystemSettings(), fetchTags(), fetchCategories()]).then(
    ([settings, tags, categories]) => {
      return { settings, tags, categories };
    }
  );
