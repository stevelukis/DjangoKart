import React from "react";
import { Typography } from "@material-tailwind/react";
import MinusIcon from "../../assets/images/minus-circle.svg";
import MinusDisabledIcon from "../../assets/images/minus-circle-disabled.svg";
import PlusDisabledIcon from "../../assets/images/plus-circle-disabled.svg";
import PlusIcon from "../../assets/images/plus-circle.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import { CartItemResponse } from "../../services/api";

type CartItemProps = {
  item: CartItemResponse;
  updateItemQuantity: (id: number, newQuantity: number) => Promise<boolean>;
  setCartItemList: React.Dispatch<React.SetStateAction<CartItemResponse[]>>;
  cartItemList: CartItemResponse[];
  deleteItem: (id: number) => Promise<boolean>;
};

function CartItem({
  item,
  updateItemQuantity,
  setCartItemList,
  cartItemList,
  deleteItem,
}: CartItemProps) {
  return (
    <div key={item.id} className="flex flex-col mb-5">
      <Typography className="w-[550px] line-clamp-1 break-words" variant="h6">
        {item.product.title}
      </Typography>
      <div className="flex flex-row w-full justify-between">
        <Typography variant="paragraph">${item.product.unit_price}</Typography>
        <div className="w-32 flex flex-row justify-between">
          {item.quantity > 1 ? (
            <img
              src={MinusIcon}
              className="cursor-pointer"
              alt="Button to decrease quantity"
              onClick={() => {
                updateItemQuantity(item.id, item.quantity - 1);
                setCartItemList(
                  cartItemList.map((mapItem) => {
                    if (mapItem.id == item.id) {
                      mapItem.quantity -= 1;
                      mapItem.total_price =
                        mapItem.quantity * mapItem.product.unit_price;
                    }
                    return mapItem;
                  })
                );
              }}
            />
          ) : (
            <img
              src={MinusDisabledIcon}
              className="cursor-pointer"
              alt="Disabled button to decrease quantity"
            />
          )}
          <Typography variant="paragraph">{item.quantity}</Typography>
          {item.quantity == item.product.inventory ? (
            <img
              src={PlusDisabledIcon}
              className="cursor-pointer"
              alt="Disabled button to increase quantity"
            />
          ) : (
            <img
              src={PlusIcon}
              className="cursor-pointer"
              alt="Button to increase quantity"
              onClick={() => {
                updateItemQuantity(item.id, item.quantity + 1);
                setCartItemList(
                  cartItemList.map((mapItem) => {
                    if (mapItem.id == item.id) {
                      mapItem.quantity += 1;
                      mapItem.total_price =
                        mapItem.quantity * mapItem.product.unit_price;
                    }
                    return mapItem;
                  })
                );
              }}
            />
          )}
          <img
            src={DeleteIcon}
            className="cursor-pointer"
            alt="Button to delete cart item"
            onClick={() => {
              deleteItem(item.id);
              setCartItemList(
                cartItemList.filter((mapItem) => mapItem.id != item.id)
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
