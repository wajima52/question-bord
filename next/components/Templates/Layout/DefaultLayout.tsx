import { Header } from "../../Organisms/Header/Header"

const DefaultLayout: React.FC = () => {
  const menuItems = [
    {
      itemName: "Solutions",
      type: "dropDown",
      itemList: [
        {
          name: "Analytics",
          description: "解析だよ",
        },
        {
          name: "Analytics",
          description: "解析2だよ",
        },
      ],
    },
    {
      itemName: "Price",
      type: "button",
    },
    {
      itemName: "その他",
      type: "dropDown",
      itemList: [
        {
          name: "よくあるご質問",
          description: "良くある質問だよ！",
        },
      ],
    },
  ]
  return <Header menuItems={menuItems} />
}

export default DefaultLayout
