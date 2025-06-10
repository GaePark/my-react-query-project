import style from "@emotion/styled";

export const Container = style.div`
  width: 960px;
  margin: 80px auto 0 auto;
`;

export const Row = style.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
`;

export const ListBox = style.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
  background-color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ListTitle = style.p`
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 8px 0;
`;

export const ListText = style.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 12px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 두 줄까지 보여줌 */
  -webkit-box-orient: vertical;
`;

export const ListMeta = style.div`
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
`;
