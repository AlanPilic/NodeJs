$(document).ready(function(){
    $('.deleteCustomer').on('click', deleteCustomer);
});

function deleteCustomer(){
    var confirmation = confirm("Are you sure?");

    if(confirmation){
        $.ajax({
            type:'DELETE',
            url: '/products/delete/' + $(this).data('id')
        }).done(function(response){
            window.location.replace('/');
        });
        window.location.replace('/');
    } else {
        return false;
    }
}

$(document).ready(function(){
    $('.individualCategory').on('click', showCategory);
});

function showCategory(){
    window.location.replace('/products/category/' + $(this).data('id'));
}