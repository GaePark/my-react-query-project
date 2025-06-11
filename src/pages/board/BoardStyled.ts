import style from "@emotion/styled";

export const Container = style.div`
  max-width: 960px;
  width: 100%;
  margin: 80px auto 80px auto;
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
  max-width: 100%;
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
  @media(max-width: 960px) {
  margin: 0 20px;
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
  text-overflow: ellipsis;
  white-space: nowrap;
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

export const ListPaginationBox=style.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
export const PageBtn = style.button`
  display: inline-grid;
  place-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #000;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const PageTextBox = style.p`
    font-size: 16px;
    color: #888;
    display:flex;
    align-items: center;
`

export const PageText = style.span`
    font-size: 16px;
    color: #333;
    font-weight:600;
`

export const BtnBox = style.div`
    text-align: right;
    
    @media(max-width: 960px) {
        margin: 0 20px;
    }
`
