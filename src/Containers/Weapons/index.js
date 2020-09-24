import React, { useState, useEffect } from "react";

import { purifyString } from "Helpers/purifyString";

import WeaponsData from "Json/armas.json";

import Container from "Components/Container";
import Input from "Components/Input";

import "./style.scss";

const Weapons = () => {
  const [filter, setFilter] = useState("");
  const [categorieHasItem, setCategorieHasItem] = useState(undefined);

  const filterEverything = () => {
    const newCategorieHasItem = [];

    if (!filter) {
      return false;
    }

    WeaponsData.categories.forEach((category, categoryIndex) => {
      const categoryName = purifyString(category.name);
      newCategorieHasItem.push({
        hasItems: true,
        subcategories: [],
      });

      if (
        (filter.includes("simples") ||
          filter.includes("marciais") ||
          filter.includes("exoticas")) &&
        !categoryName.includes(filter)
      ) {
        newCategorieHasItem[categoryIndex].hasItems = false;
      }

      category.subcategories.forEach((subCategory, subCategoryIndex) => {
        const subCategoryName = purifyString(subCategory.name);
        newCategorieHasItem[categoryIndex].subcategories.push({
          hasItems: true,
          items: [],
        });

        if (
          (filter.includes("leves") ||
            filter.includes("corpoacorpo") ||
            filter.includes("distancia") ||
            filter.includes("umamao") ||
            filter.includes("duasmaos")) &&
          !subCategoryName.includes(filter)
        ) {
          newCategorieHasItem[categoryIndex].subcategories[
            subCategoryIndex
          ].hasItems = false;
        }

        subCategory.items.forEach((subCategoryItem) => {
          let hasFiltered = false;

          if (
            !!filter &&
            !(
              filter.includes("simples") ||
              filter.includes("marciais") ||
              filter.includes("exoticas") ||
              filter.includes("leves") ||
              filter.includes("corpoacorpo") ||
              filter.includes("distancia") ||
              filter.includes("umamao") ||
              filter.includes("duasmaos")
            )
          ) {
            const itemName = purifyString(subCategoryItem.name);
            const itemDamageType = purifyString(subCategoryItem.damageType);
            const itemDamage = purifyString(subCategoryItem.damage);
            const itemCritical = purifyString(subCategoryItem.critical || "");
            const itemCost = purifyString(subCategoryItem.price || "");
            const itemWeight = purifyString(subCategoryItem.weight || "");
            const itemFrom = purifyString(subCategoryItem.manual);

            hasFiltered = false;

            if (itemName.includes(filter)) {
              hasFiltered = true;
            } else if (!!itemDamageType && itemDamageType.includes(filter)) {
              hasFiltered = true;
            } else if (!!itemDamage && itemDamage.includes(filter)) {
              hasFiltered = true;
            } else if (!!itemCritical && itemCritical.includes(filter)) {
              hasFiltered = true;
            } else if (!!itemCost && itemCost.includes(filter)) {
              hasFiltered = true;
            } else if (!!itemWeight && itemWeight.includes(filter)) {
              hasFiltered = true;
            } else if (itemFrom.includes(filter)) {
              hasFiltered = true;
            }
          } else {
            hasFiltered = true;
          }

          if (hasFiltered) {
            newCategorieHasItem[categoryIndex].subcategories[
              subCategoryIndex
            ].items.push(true);
          } else {
            newCategorieHasItem[categoryIndex].subcategories[
              subCategoryIndex
            ].items.push(false);
          }
        });

        if (
          !newCategorieHasItem[categoryIndex].subcategories[
            subCategoryIndex
          ].items.includes(true)
        ) {
          newCategorieHasItem[categoryIndex].subcategories[
            subCategoryIndex
          ].hasItems = false;
        }
      });
    });

    setCategorieHasItem(() => newCategorieHasItem);
  };

  useEffect(() => {
    filterEverything();
  }, [filter]);

  return (
    <div id="weapons">
      <Container>
        <div className="weapons-filter">
          <Input
            options={{
              placeholder: "Filtre através de qualquer informação",
              onChange: (e) => {
                const val = purifyString(e.target.value);

                setFilter(() => val);
              },
            }}
          />
        </div>

        {WeaponsData.categories.map((category, categoryIndex) => {
          if (
            !!filter &&
            !!categorieHasItem &&
            !categorieHasItem[categoryIndex].hasItems
          ) {
            return false;
          }

          return (
            <div
              className="weapons-categories"
              key={`weapons-category-${categoryIndex}`}
            >
              {category.subcategories.map((subCategory, subCategoryIndex) => {
                if (
                  !!filter &&
                  !!categorieHasItem &&
                  !categorieHasItem[categoryIndex].subcategories[
                    subCategoryIndex
                  ].hasItems
                ) {
                  return false;
                }

                return (
                  <div
                    className="weapons-subcategories"
                    key={`weapons-category-${subCategoryIndex}`}
                  >
                    <div className="subcategories-title">
                      <span>{category.name}: </span>
                      <span>{subCategory.name}</span>
                    </div>

                    <div className="weapons-items-list">
                      {subCategory.items.map(
                        (subCategoryItem, subCategoryItemIndex) => {
                          if (
                            !!filter &&
                            !(
                              filter.includes("simples") ||
                              filter.includes("marciais") ||
                              filter.includes("exoticas") ||
                              filter.includes("leves") ||
                              filter.includes("corpoacorpo") ||
                              filter.includes("distancia") ||
                              filter.includes("umamao") ||
                              filter.includes("duasmaos")
                            ) &&
                            !!categorieHasItem &&
                            !categorieHasItem[categoryIndex].subcategories[
                              subCategoryIndex
                            ].items[subCategoryItemIndex]
                          ) {
                            return false;
                          }

                          return (
                            <div
                              className="weapon-item"
                              key={`weapons-category-${subCategoryIndex}-item-${subCategoryItemIndex}`}
                            >
                              <div className="weapon-infos-list">
                                <div className="weapon-name">
                                  {subCategoryItem.name}
                                </div>

                                <div className="weapon-type">
                                  {subCategoryItem.damageType}
                                </div>

                                <div className="weapon-info">
                                  <span>Dano:</span>
                                  <span>{subCategoryItem.damage}</span>
                                </div>

                                <div className="weapon-info">
                                  <span>Crítico:</span>
                                  <span>
                                    {subCategoryItem?.critical?.replace(
                                      " ",
                                      " / "
                                    ) || `20 / x2`}
                                  </span>
                                </div>

                                {!!subCategoryItem.price && (
                                  <div className="weapon-info">
                                    <span>Preço:</span>
                                    <span>{subCategoryItem.price}</span>
                                  </div>
                                )}

                                {!!subCategoryItem.weight && (
                                  <div className="weapon-info">
                                    <span>Peso:</span>
                                    <span>{subCategoryItem.weight}</span>
                                  </div>
                                )}

                                {!!subCategoryItem.extra && (
                                  <div className="weapon-extras">
                                    {subCategoryItem.extra.map(
                                      (
                                        subCategoryItemExtras,
                                        subCategoryItemExtrasIndex
                                      ) => {
                                        return (
                                          <div
                                            key={`weapons-category-${subCategoryIndex}-item-${subCategoryItemIndex}-extras-${subCategoryItemExtrasIndex}`}
                                          >
                                            {subCategoryItemExtras}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="weapon-from">
                                {subCategoryItem.manual}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Weapons;
