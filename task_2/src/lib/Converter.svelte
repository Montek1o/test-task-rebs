<script lang="ts">
  const APIKey = '5afb5937ef697d0fcdba9ca1';
  const currencies = ['EUR', 'USD', 'RUB'];
  let rate = 1;

  let value1: number;
  let value2: number;
  let selected1: string;
  let selected2: string;

  async function fetchRates(from: string, to: string) {
    const responce = await fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${from}`);
    const json = await responce.json();
    rate = json.conversion_rates[to];
  }

  async function handleInput1() {
    await fetchRates(selected1.trim(), selected2.trim());
    value2 = +(value1 * rate).toFixed(1);
  }
  
  async function handleInput2() {
    await fetchRates(selected2.trim(), selected1.trim());
    value1 = +(value2 * rate).toFixed(1);
  }

  $: selected1 && handleInput2();
  $: selected2 && handleInput1();
</script>

<div class="converter">
  <h1>Сurrency сonverter</h1>
  <div class="converter__inputs">
    <div>
      <input 
        bind:value={value1}
        on:input={handleInput1}
        type="number" 
        placeholder="Введите число"
      >
      <select bind:value={selected1}>
        {#each currencies as currency}
          <option>
            {currency}
          </option>
        {/each}
      </select>
    </div>
      <span>↔</span>
    <div>
      <input 
        bind:value={value2}
        on:input={handleInput2}
        type="number" 
        placeholder="Введите число"
      >
      <select bind:value={selected2}>
        {#each currencies as currency}
          <option>
            {currency}
          </option>
        {/each}
      </select>
    </div>
  </div>
  <div class="converter__total">
    <p>{value1 ? value1 : 0} {selected1}</p>
    <span class="converter__arrows"> = </span>
    <p>{value2 ? value2 : 0} {selected2}</p>
  </div>
</div>

<style>
  .converter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .converter__inputs {
    display: flex;
    column-gap: 20px;
  }

  .converter__total {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
</style>
