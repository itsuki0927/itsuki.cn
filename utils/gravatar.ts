import gravatar from 'gravatar';

/**
 * 通过邮箱获取gravatar地址
 *
 * @param email 邮箱
 * @returns 地址
 */
const getGravatarUrl = (email: string) => gravatar.url(email, { protocol: 'https' });

export default getGravatarUrl;