(function(){
  const $ = e=>document.querySelector(e);

  $(".dashboard-sidebar").insertBefore(
    (function(){
      const g = document.createElement('div');
      g.setAttribute("id", "github-top-show-org")
      return g;
    }()),
    $(".dashboard-sidebar").firstChild
  )

  new Vue({
    el: "#github-top-show-org",
    template: `
      <div id="github-top-show-org" style="margin-bottom:10px;">
        <h2 style="font-size:16px;margin-bottom:5px;">Organizations</h2>
        <ul style="list-style: none;">
          <li v-for="org in organizations" style="display: inline-block;margin: 1px;">
            <a :href="org.url" style="text-decoration: none;">
              <img :src="org.avatar_url" width="74" height="74" style="width: 37px;height: 37px;border-radius: 3px;">
            </a>
          </li>
        </ul>
      </div>
    `,
    data: ()=>{
      return {
        organizations: []
      }
    },
    created: function(){
      fetch(
        `https://api.github.com/users/${$(".header-nav-link.name").href.replace(/https:\/\/github.com\//g, "")}/orgs`
      ).then((response)=>{
        return response.json();
      }).then((orgs)=>{
        this.$data.organizations = orgs.map((org)=>{
          org.url = "https://github.com/" + org.url.replace(/https:\/\/api.github.com\/orgs\//, '');
          return org;
        });
      }).catch((err)=>{
        console.error("Failed to fetch organizations data. [github-top-show-org]\n", err);
      })
    }
  });
}());
