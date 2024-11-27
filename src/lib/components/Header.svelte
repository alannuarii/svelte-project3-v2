<script>
  import Timer from "./Timer.svelte";

  export let freqData;

  const isFreqOutOfRange = (frequency) => frequency > 50.5 || frequency < 49.5;
</script>

<nav class="navbar bg-dark shadow">
  <div class="container-fluid">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a class="navbar-brand text-light ms-3 d-flex align-items-center" href="/">Dashboard ULPLTD Tahuna</a>
    <div class="ms-auto py-2 px-4">
      {#if freqData.length > 2 && freqData[2]}
        <a href="/chart/{freqData[2]._measurement}-{freqData[2]._field}" class:out-of-range={isFreqOutOfRange(freqData[2]._value)} class="me-1 text-light frequency-text">
          {freqData[2]?._value?.toFixed(2) ?? "00.00"} Hz
        </a>
      {:else}
        <h1 class="text-light">00.00 Hz</h1>
      {/if}
    </div>
    <div class="ms-auto me-5"><Timer /></div>
  </div>
</nav>

<style>
  nav {
    height: 80px;
  }
  .navbar-brand {
    font-size: 25px;
    font-weight: 700;
  }
  .reload {
    font-size: 22px;
    cursor: pointer;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  img {
    height: 30px;
  }
  h6 {
    font-weight: 300;
  }
  .user {
    cursor: pointer;
  }
  .user:hover {
    color: #43a6a3 !important;
  }
  .frequency-text {
    font-size: 35px;
    font-weight: 700;
    margin-bottom: -7px;
    cursor: pointer;
    text-decoration: none;
  }
  .frequency-text:hover {
    color: #0d6efd !important;
  }
  /* Style dasar untuk teks */
  .frequency-text {
    transition:
      color 0.3s ease,
      text-shadow 0.3s ease;
  }

  /* Style ketika frekuensi di luar batas normal */
  .frequency-text.out-of-range {
    color: red; /* Warna merah */
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.7); /* Efek menyala */
    animation: pulse 1s infinite alternate; /* Efek menyala */
  }

  /* Animasi untuk memberikan efek menyala */
  @keyframes pulse {
    from {
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
    }
    to {
      text-shadow: 0 0 20px rgba(255, 0, 0, 1);
    }
  }
</style>
