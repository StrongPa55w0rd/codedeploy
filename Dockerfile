# EC2 Container Service Lab

FROM centos:centos6
MAINTAINER  Tito Panicker <tito.panicker@hbo.com>

# Configuring YUM to be as lenient as possible
RUN echo -e "assumeyes=1\nalwaysprompt=0\ntolerant=1\n" >> /etc/yum.conf

# TODO: For all `yum installs` PIN to a specific release version
# Installing EPEL and needed packages
RUN yum install epel-release

# Installing additional packages needed by Hubot
RUN yum install \
  git \
  httpd


# Copy ssh key and config into the Docker image
COPY code/* /var/www/html/
