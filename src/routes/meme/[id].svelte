<script context="module">
    export async function load ({petch, params}){
        console.log(params.id)
        const res = await fetch(`http://localhost:5000/meme/${params.id}`)

        const data = await res.json()
        console.log(data)
    }

</script>