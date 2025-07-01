// 示例：向导航栏添加滚动时的背景色变化
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 生成随机三角形
function generateTriangles() {
    const container = document.querySelector('.triangle-background');
    const numTriangles = 50;

    for (let i = 0; i < numTriangles; i++) {
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        triangle.style.borderLeft = '50px solid transparent';
        triangle.style.borderRight = '50px solid transparent';
        triangle.style.borderBottom = '80px solid #c5a47e';
        triangle.style.opacity = Math.random() * 0.5 + 0.5;
        triangle.style.transform = `rotate(${Math.random() * 360}deg)`;
        triangle.style.top = `${Math.random() * 100}vh`;
        triangle.style.left = `${Math.random() * 100}vw`;
        container.appendChild(triangle);
    }
}

// 更新三角形位置
function updateTriangles(event) {
    const triangles = document.querySelectorAll('.triangle');
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    triangles.forEach((triangle, index) => {
        const distanceX = mouseX - triangle.offsetLeft;
        const distanceY = mouseY - triangle.offsetTop;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const scale = 1 + (distance / 500);
        triangle.style.transform = `rotate(${Math.random() * 360}deg) scale(${scale})`;
    });
}

// 初始化三角形
generateTriangles();

// 监听鼠标移动事件
document.addEventListener('mousemove', updateTriangles);

// 表单提交处理
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交行为

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // 显示加载状态
    submitButton.disabled = true;
    submitButton.textContent = '正在发送...';

    fetch(form.action, {
        method: form.method,
        headers: {
            'Accept': 'application/json'
        },
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(data => {
            throw new Error(data.error || 'Something went wrong');
        });
    })
    .then(data => {
        alert('感谢您的留言！');
        form.reset();
    })
    .catch(error => {
        alert('发送失败，请稍后再试。');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});