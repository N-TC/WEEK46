<template>
  <footer>
    <h3>
      CUSTOMER RELATIONS 1-800-296-2332 VISIT loblaws.ca FOR STORE HOURS
    </h3>
    <p>
      Please call Customer Relations at 1-800-296-2332 or visit our
      website at loblaws.ca for your particular store’s hours and for a
      list of the Loblaws® locations that DO NOT participate in this
      flyer, see http://www.
      loblaws.ca/en_CA/company-policy/terms-and-conditions.html.
      <span>Quantities and/or selection of items may be limited and may not
        be available in all stores.</span>
      No Rainchecks OR Substitutions on clearance items or where
      quantities are advertised as limited.
      <span>Advertised regular pricing and product selection (flavour,
        colour, patterns, style) may vary by store location.</span>
      We are not obligated to sell items based on errors or misprints in
      typography or photography. Pricing: All references in our flyer to
      “Save, Was, Now, Savings, etc.” is in comparison to our own
      regular prices.
      <span>Therefore, savings on items shown may vary in each store
        location.</span>
      Coupons must be presented and redeemed at time of purchase.
      Applicable taxes, deposits, or environmental surcharges are extra.
      No sales to retail outlets. ®/TM The trademarks, service marks and
      logos displayed in this flyer are trademarks of Loblaws Inc. and
      others. All rights reserved. © 2019 Loblaws Inc. MasterCard and
      the MasterCard Brand Mark are registered trademarks and PayPass is
      a trademark of MasterCard International Incorporated. President’s
      Choice Bank a licensee of marks. PC Optimum program is provided by
      President’s Choice Services Inc. President’s Choice Financial
      MasterCard is provided by President’s Choice Bank. President’s
      Choice Financial personal banking services are provided by the
      direct banking division of Simplii Financial. ®PC, President’s
      Choice, PC Financial and President’s Choice Financial are
      registered trademarks of Loblaws Inc. Trademarks used under
      licence. We reserve the right to limit quantities to reasonable
      family requirements.
    </p>
    <ul>
      <li>
        <a href="https://www.facebook.com/LoblawsON/" target="_blank"><img src="/icons/facebook.png"></a>
      </li>
      <li>
        <a href="https://www.instagram.com/loblawson/" target="_blank"><img src="/icons/instagram.png"></a>
      </li>
    </ul>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  color: $white;
  padding: 20px;
  margin: 0 10px 0 3px;

  h3 {
    font: 800 17px/18px "Univers LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  p {
    font: 100 10px/10px 'Lato', sans-serif;
    margin: 10px 0 35px;
    span {
      font-weight: 800;
      text-decoration: underline;
    }
  }

  img {
    height: 22px;
  }

  li {
    display: inline;
    & + li {
      margin-left: 7px;
    }
  }

  @media screen and (min-width: $tablet) {
    padding: 20px 0;
    p {
      margin: 5px 0 10px;
    }
  }

  @media screen and (min-width: $desktop) {
    position: relative;
    ul {
      position: absolute;
      top: 14px;
      right: 0;
      white-space: nowrap;
    }
  }
}
</style>
